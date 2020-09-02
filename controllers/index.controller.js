const { check, validationResult } = require("express-validator");
const indexModel = require("../models/index.model");
const NotesModel = require("../models/notes.model");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res) => {
  let users = await indexModel.find({});
  //   console.log((users));
  res.render("signup", {
    pageTitle: "Authentication",
    isLoggedIn:false,
    MessageError: [],
    oldInputs: { name: "", email: "", password: "", confirmPassword: "" },
  });
};

module.exports.handleSignUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    const user = await indexModel.findOne({ email });
    console.log(user);
    if (user) {
      res.render("signup", {
        pageTitle: "SignUp",
        MessageError: [{ param: "exists" }],
        isLoggedIn:false,
        oldInputs: { name, email, password, confirmPassword },
      });
    } else {
      bcrypt.hash(password, 8, function (err, hashPassword) {
        indexModel.insertMany({ name, email, password: hashPassword });
        res.redirect("/signin");
      });
      // const match = await bcrypt.compare(password, user.passwordHash);
    }
  } else {
    res.render("signup", {
      pageTitle: "SignUp",
      isLoggedIn:false,
      MessageError: errors.array(),
      oldInputs: { name, email, password, confirmPassword },
    });
  }
};
module.exports.signin = async (req, res) => {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn:false,
        MessageError:[],
        oldInputs: {  email:'', password:'' },
      });
};

module.exports.handleSignin = async (req, res) => {
  const { email, password } = req.body;
  const user = await indexModel.findOne({ email });
  if (user) {
      console.log('test');
                const match = await bcrypt.compare(password, user.password);
                if (match) {

                    // res.setHeader('set-cookie','userID='+user._id)
                    req.session.isLoggedIn=true;
                    req.session.userID=user._id;
                    req.session.userName=user.name;

                    res.redirect('/home')
                }else 
                {
                    res.render("signin", {
                        pageTitle: "SignIn",
                        isLoggedIn:false,
                        MessageError:[{param:'incorrect'}],
                        oldInputs: {  email, password },
                    });   
                    
                    }
  }else 
  {
    res.render("signin", {
        pageTitle: "SignIn",
        isLoggedIn:false,
        MessageError:[{param:'notRegisered'}],
        oldInputs: {  email, password },
      });   
    
    
    
    }
  }


module.exports.home = async (req, res) => {
        const notes = await indexModel.find({_id:req.session.userID});
        
        // ============== DELETE=============================
    //  await   indexModel.update({_id:req.session.userID},{

    //   $pull:{
    //     "notes":{"_id":"5f4ea478ae04265330221865"}
    //   }
    //  })
        // ============== /DELETE=============================    
     await indexModel.updateOne({_id:req.session.userID,"notes._id":"5f4ea481ae04265330221866"},{

      $set:{"notes.$.title":"Mohamed Ali"}
     })


    //  res.json(notes)

        res.render("index", { pageTitle:req.session.userName , isLoggedIn: req.session.isLoggedIn ,notes,welcom:'welcome '+ req.session.userName});

};

module.exports.logout = (req, res) => {
    req.session.destroy(()=>{
                res.redirect('/signin')
    })
  };

module.exports.notfound = (req, res) => {
  res.send("not found 404");
};

module.exports.delete_note=(req,res)=>{
  //noteID
const id=req.params.id;

  indexModel.updateOne({_id:req.session.userID},{
     $pull:{
        "notes":{"_id":id}
      }
      }).then(data=>{
        res.redirect('/home')
      }).catch(err=>console.log(err))
}

module.exports.edit_note=(req,res)=>{
  const noteID=req.params.id;
  indexModel.findOne({_id:req.session.userID,"notes._id":noteID}).then(data=>{
   const note= data.notes.find(note=> note._id==noteID);
    console.log(note);
    res.render('edit_note',{pageTitle:'editNote',isLoggedIn: req.session.isLoggedIn,note});
   }).catch(err=>{
     console.log(err)
   })
}

module.exports.handle_edit_post=(req,res)=>{
const noteId=req.params.id;
  indexModel.updateOne({_id:req.session.userID,"notes._id":noteId},{

    $set:{"notes.$.title":req.body.title,"notes.$.desc":req.body.desc}
   }).then(data=>{
     res.redirect('/home')
   }).catch(err=>{
     console.log(err);
   })

}

// /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/ for name
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/  for password

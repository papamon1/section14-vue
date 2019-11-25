const User = require('../models/users');
const passport=require('passport');

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.getCurrentUser=function(req,res,next){
  const user=req.user;

  if(!user){
    return res.sendStatus(422);    
  }
  // FOR SESSION AUTH ONLY
  // return res.json(user);

  return res.json(user.toAuthJSON());

}


exports.register = function(req, res) {
  const registerData = req.body

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
        message: 'Email is required'
      }
    })
  }

  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
        message: 'Password is required'
      }
    })
  }

  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation password',
        message: 'Password is not the same as confirmation password'
      }
    })
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) { return res.status(422).json({errors}) };
   
    })
}

exports.login = function(req, res, next) {
  const {email, password} = req.body

  if (!email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  //cuando se crea passport.authenticate, devuelve una funcion. Se podría instanciar el objeto y después llamar a la funcion, 
  // pero puede hacerse directamente en una linea si llamas a la funcion entre parentesis acto seguido como vemos abajo

  return passport.authenticate('local', (err,passportUser)=>{
    if(err){
      return next(err)
    }

    if(passportUser){
      return res.json(passportUser.toAuthJSON())
    }

    //ONLY FOR SESSION AUTH
    // if(passportUser){
      
    //   //Esta funcion está disponible gracias a haber declarado el middleware passport
    //   req.login(passportUser,function(err){
    //     if(err){next(err);}
    //     return res.json(passportUser);
    //   });
    // }else{
    //   return res.status(422).send({
    //     errors:{
    //       'authentication':'Ooooops, something went wrong!'
    //     }
    //   })
    // }

  })(req,res,next)
}

exports.logout = function(req,res) {
  console.log('logout')
  req.logout()
  return res.json({status:'Sesiondestroyed!'})
}
<template>
   <div class='form_center'>
      <h1>Login</h1>
      <form methode='post'>
         <div class='form_text'>
            <input type='text' placeholder="Username" required>
            <label>Username</label>
         </div>
         <div class='form_text'>
            <input type='password' placeholder="Password" required>
            <label>Password</label>
         </div>
         <div class='form_forgetPassword'>Forgot password?</div>
         <input type='submit' value='Login'>
         <div class='form_signupLink'>
            Not a member? <a href="#">Signup</a>
         </div>
      </form>
   </div>
</template>


<script>

export default {
   name: 'Login'
}
</script>


<style scoped>
.form_center {
   display: flex;
   flex-direction: column;

   border-radius: 10px;
   width: 400px;

   background: #ffffff;
   padding: 25px;
}

.form_text {
   display: flex;
   flex-direction: column;

   margin: 30px 0;

   border-bottom: 2px solid rgb(36, 35, 35);
}

.form_center h1 {
   text-align: center;
   padding: 0 0 10px 0;
   border-bottom: 1px solid silver;
}

.form_text input {
   padding: 5px 25px;
   height: 25px;
   border: none;
   /* background: none; */
   outline: none;
   font-size: 16px;
}

.form_forgetPassword {
   margin: -5px 0 20px 5px;
   color: rgb(100, 98, 98);
   cursor: pointer;
}

.form_forgetPassword:hover {
   text-decoration: underline;
}

input[type='submit'] {
   width: 100%;
   height: 50px;
   border: 1px solid;
   background:#3498db;
   border-radius: 25px;
   font-size: 18px;
   color: #e9f4fb;
   font-weight: 700;
   cursor: pointer;
}

input[type='submit']:hover {
   border-color: #2a8ed1;
   transition: 0.3s;
}

.form_signupLink {
   margin: 30px 0 0 0;
   text-align: center;
   font-size: 16px;
}

.form_signupLink a {
   color: #3498db;
   text-decoration: none;
}

.form_signupLink a:hover {
   text-decoration: underline;
}
</style>

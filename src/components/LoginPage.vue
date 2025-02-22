<template>
  <div class="login-container">
    <div class="login-box" :class="{ 'shake': error }">
      <div class="header">
        <h1>Welcome Back</h1>
        <p class="subtitle">Please sign in to continue</p>
      </div>

      <form @submit.prevent="login">
        <div class="form-group" :class="{ 'focused': isFocused.username }">
          <label for="username">
            <i class="fas fa-user"></i>
            Username
          </label>
          <input type="text" id="username" v-model="username" @focus="isFocused.username = true"
            @blur="isFocused.username = false" required />
        </div>

        <div class="form-group" :class="{ 'focused': isFocused.password }">
          <label for="password">
            <i class="fas fa-lock"></i>
            Password
          </label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
              @focus="isFocused.password = true" @blur="isFocused.password = false" required />
            <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="showPassword = !showPassword"></i>
          </div>
        </div>

        <div class="options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe">
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" :disabled="isLoading">
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <transition name="fade">
        <p v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </p>
      </transition>

      <div class="divider">
        <span>or continue with</span>
      </div>

      <div class="social-login">
        <button class="social-btn google">
          <i class="fab fa-google"></i>
        </button>
        <button class="social-btn facebook">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button class="social-btn twitter">
          <i class="fab fa-twitter"></i>
        </button>
      </div>

      <p class="signup-link">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
      showPassword: false,
      rememberMe: false,
      isLoading: false,
      isFocused: {
        username: false,
        password: false
      }
    }
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.error = null;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (this.username === 'admin' && this.password === 'admin') {
          this.$router.push({ name: 'home' });
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        this.error = 'Invalid username or password!';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  transition: all 0.3s ease;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 16px;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group i {
  margin-right: 8px;
  color: #666;
}

.form-group.focused label {
  color: #667eea;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.password-input {
  position: relative;
}

.password-input i {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background-color: #fff2f0;
  color: #ff4d4f;
  padding: 12px;
  border-radius: 8px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.shake {
  animation: shake 0.82s cubic-bezier(.36, .07, .19, .97) both;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e1e1e1;
}

.divider span {
  padding: 0 16px;
  color: #666;
  font-size: 14px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e1e1e1;
  background: white;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.social-btn i {
  font-size: 20px;
}

.google i {
  color: #DB4437;
}

.facebook i {
  color: #4267B2;
}

.twitter i {
  color: #1DA1F2;
}

.signup-link {
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
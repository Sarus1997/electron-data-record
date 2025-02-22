<template>
  <div class="login-container">
    <div class="login-box" :class="{ 'shake': error }">
      <div class="header">
        <h1>Electron Data Record</h1>
        <p class="subtitle">{{ subtitle }}</p>
      </div>

      <form @submit.prevent="login">
        <div class="form-group" :class="{ 'focused': isFocused.username }">
          <label for="username">
            <i class="fas fa-user"></i>
            {{ Username }}
          </label>
          <input type="text" id="username" v-model="username" @focus="isFocused.username = true"
            @blur="isFocused.username = false" required />
        </div>

        <div class="form-group" :class="{ 'focused': isFocused.password }">
          <label for="password">
            <i class="fas fa-lock"></i>
            {{ Password }}
          </label>
          <div class="password-input">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
              @focus="isFocused.password = true" @blur="isFocused.password = false" required />
            <i class="fas password-toggle" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="showPassword = !showPassword"></i>
          </div>
        </div>

        <button type="submit" :disabled="isLoading" class="submit-btn">
          <span v-if="!isLoading">{{ SignIn }}</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>

      <Transition name="fade">
        <p v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref(null)
const showPassword = ref(false)
const isLoading = ref(false)
const isFocused = reactive({
  username: false,
  password: false
})

// Thai language constants
const subtitle = "กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ"
const Username = "ชื่อผู้ใช้"
const Password = "รหัสผ่าน"
const SignIn = "เข้าสู่ระบบ"

const login = async () => {
  isLoading.value = true
  error.value = null
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (username.value === 'admin' && password.value === 'admin') {
      router.push({ name: 'home' })
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (err) {
    error.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  color: #2d3748;
  font-size: 24px;
  margin-bottom: 10px;
}

.subtitle {
  color: #718096;
  font-size: 16px;
}

.form-group {
  margin-bottom: 25px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-size: 14px;
}

label i {
  margin-right: 8px;
  color: #667eea;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
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

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #718096;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #5a67d8;
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.error-message i {
  margin-right: 8px;
}

/* Loading Spinner */
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

/* Shake Animation */
.shake {
  animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
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

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-box {
    padding: 20px;
  }

  h1 {
    font-size: 20px;
  }

  .subtitle {
    font-size: 14px;
  }
}
</style>
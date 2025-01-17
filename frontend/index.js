document.addEventListener('mousemove', function (e) {
    const circleCursor = document.getElementById('CircleCursor');
    circleCursor.style.left = e.pageX + 'px';
    circleCursor.style.top = e.pageY + 'px';
});

document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    
    if (signupBtn) {
      signupBtn.addEventListener('click', async () => {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const error = document.getElementById('signup-error');
  
        if (name && email && password) {
          try {
            const response = await fetch('http://localhost:4000/api/user/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, password }),
            });
  
            const data = await response.json();
  
            if (response.ok) {
              alert('Sign Up Successful! Redirecting to Login page...');
              error.style.display = 'none';
              document.getElementById('signup-form').style.display = 'none';
              document.getElementById('login-form').style.display = 'block';
            } else {
              error.textContent = data.message || 'Sign Up Failed!';
              error.style.display = 'block';
            }
          } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
          }
        } else {
          error.textContent = 'All fields are required!';
          error.style.display = 'block';
        }
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const error = document.getElementById('login-error');
  
        if (email && password) {
          try {
            const response = await fetch('http://localhost:4000/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
  
            const data = await response.json();
  
            if (response.ok) {
              alert(`Welcome back, ${data.name}!`);
              error.style.display = 'none';
              localStorage.setItem('user', JSON.stringify(data));
              window.location.href = 'index.html';
            } else {
              error.textContent = data.message || 'Invalid email or password.';
              error.style.display = 'block';
            }
          } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
          }
        } else {
          error.textContent = 'All fields are required!';
          error.style.display = 'block';
        }
      });
    }
  });

  function switchToSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

  


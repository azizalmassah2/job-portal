'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('الرجاء ملء جميع الحقول');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'حدث خطأ في تسجيل الدخول');
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('✅ تسجيل الدخول ناجح:', data);

      router.push('/dashboard');
    } catch (err) {
      setError('حدث خطأ أثناء الاتصال بالسيرفر.');
      setLoading(false);
    }
  };

  // أيقونات SVG مع الألوان الرسمية
  const socialProviders = [
    {
      name: 'Google',
      color: '#DB4437',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path d="M21.35 11.1H12v2.8h5.35c-.23 1.4-1.8 4.1-5.35 4.1-3.24 0-5.88-2.7-5.88-6s2.64-6 5.88-6c1.84 0 3.08.78 3.8 1.44l2.58-2.5C16.65 5.2 14.7 4.3 12 4.3 7.48 4.3 4 7.87 4 12.4s3.48 8.1 8 8.1c4.6 0 7.63-3.24 7.63-7.8 0-.53-.05-.9-.28-1.6z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      color: '#1877F2',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path d="M22 12a10 10 0 10-11.5 9.87v-7h-2v-3h2v-2c0-2 1.2-3 3-3 .87 0 1.78.15 1.78.15v2h-1c-1 0-1.3.63-1.3 1.28v1.57h2.22l-.36 3h-1.86v7A10 10 0 0022 12z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      color: '#1DA1F2',
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.27 4.27 0 001.88-2.36 8.56 8.56 0 01-2.71 1.04 4.25 4.25 0 00-7.24 3.87A12 12 0 013 4.79a4.26 4.26 0 001.32 5.68 4.22 4.22 0 01-1.92-.53v.05a4.25 4.25 0 003.41 4.17 4.28 4.28 0 01-1.91.07 4.26 4.26 0 003.97 2.96 8.54 8.54 0 01-5.3 1.83A8.67 8.67 0 012 19.54a12.06 12.06 0 006.54 1.92c7.85 0 12.14-6.5 12.14-12.14 0-.18 0-.36-.01-.53A8.66 8.66 0 0022.46 6z" />
        </svg>
      ),
    },
  ];

  const handleSocialLogin = (provider: string) => {
    alert(`تسجيل الدخول عبر ${provider} غير مفعل حالياً.`);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Cairo', sans-serif;
        }
        body,html,#root {
          margin: 0; padding: 0; height: 100%;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          direction: rtl;
        }
        .container {
          max-width: 600px;
          width: 90%;
          margin: 70px auto 40px;
          background: rgba(255, 255, 255, 0.95);
          padding: 40px 50px;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out;
        }
        .container:hover {
          transform: translateY(-5px);
        }
        h2 {
          text-align: center;
          color: #2a5298;
          margin-bottom: 30px;
          font-weight: 600;
          font-size: 2rem;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .form-group {
          position: relative;
        }
        input {
          width: 100%;
          padding: 14px 14px 14px 14px;
          font-size: 16px;
          border: 2px solid #ddd;
          border-radius: 8px;
          background: none;
          transition: border-color 0.3s;
        }
        input:focus {
          outline: none;
          border-color: #2a5298;
        }
        label {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          padding: 0 8px;
          color: #999;
          pointer-events: none;
          transition: 0.3s ease;
          font-size: 16px;
          user-select: none;
        }
        input:focus + label,
        input:not(:placeholder-shown) + label {
          top: -10px;
          right: 10px;
          font-size: 12px;
          color: #2a5298;
        }
        button {
          position: relative;
          padding: 14px;
          background: linear-gradient(45deg, #2980b9, #2c3e50);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          user-select: none;
        }
        button:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          transform: translateY(-3px);
        }
        button:active::after {
          content: '';
          position: absolute;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.3);
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 0.6s linear;
          z-index: 1;
        }
        @keyframes ripple {
          from {
            width: 0;
            height: 0;
            opacity: 1;
          }
          to {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
        .error-msg {
          color: #e74c3c;
          font-size: 14px;
          text-align: center;
          margin-top: -10px;
        }
        .social-login {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 30px;
        }
        .social-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
          user-select: none;
        }
        .social-btn:hover {
          transform: scale(1.2);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          color: var(--hover-color);
        }
        .social-google:hover {
          --hover-color: #DB4437;
        }
        .social-facebook:hover {
          --hover-color: #1877F2;
        }
        .social-twitter:hover {
          --hover-color: #1DA1F2;
        }
        @media (max-width: 640px) {
          .container {
            width: 95%;
            padding: 30px 25px;
          }
          h2 {
            font-size: 1.6rem;
          }
          button {
            font-size: 16px;
          }
          .social-btn {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>

      <div className="container" lang="ar" dir="rtl">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              dir="rtl"
            />
            <label htmlFor="username">اسم المستخدم</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              dir="rtl"
            />
            <label htmlFor="password">كلمة المرور</label>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'جارٍ التحقق...' : 'دخول'}
          </button>
        </form>

        <div className="social-login" aria-label="تسجيل الدخول عبر وسائل التواصل الاجتماعي">
          {socialProviders.map(({ name, color, svg }) => (
            <button
              key={name}
              type="button"
              aria-label={`تسجيل الدخول عبر ${name}`}
              className={`social-btn social-${name.toLowerCase()}`}
              onClick={() => handleSocialLogin(name)}
              style={{ color }}
            >
              {svg}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

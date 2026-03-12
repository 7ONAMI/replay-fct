import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const AuthPage = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        if (!form.displayName.trim()) {
          setError("El nombre es obligatorio");
          setLoading(false);
          return;
        }
        await register(form.email, form.password, form.displayName);
      }
      navigate("/");
    } catch (err) {
      const messages = {
        "auth/user-not-found": "No existe ninguna cuenta con ese email.",
        "auth/wrong-password": "Contraseña incorrecta.",
        "auth/email-already-in-use": "Ese email ya está registrado.",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "auth/invalid-email": "El email no es válido.",
        "auth/invalid-credential": "Email o contraseña incorrectos.",
      };
      setError(messages[err.code] || "Ha ocurrido un error. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <Link to="/" className="flex items-center gap-3 w-fit">
          <img className="max-h-10" src="/images/replay.png" alt="logo" />
          <h2 className="replay text-2xl text-[#FE99A0]">
            <span className="text-[#98BCE5]">RE</span>PLAY
          </h2>
        </Link>
      </header>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-slate-700">
          <h2 className="text-white text-2xl font-bold mb-2 text-center replay">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </h2>
          <p className="text-slate-400 text-center text-sm mb-6">
            {isLogin
              ? "Accede a tus favoritos y reseñas"
              : "Únete para guardar tus películas"}
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="text-slate-300 text-sm mb-1 block">Nombre</label>
                <input
                  name="displayName"
                  type="text"
                  value={form.displayName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#98BCE5] transition"
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label className="text-slate-300 text-sm mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#98BCE5] transition"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm mb-1 block">Contraseña</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#98BCE5] transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#FE99A0] hover:bg-[#fe8089] disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold py-2.5 rounded-lg transition mt-2"
            >
              {loading
                ? "Cargando..."
                : isLogin
                ? "Entrar"
                : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-400 text-sm">
              {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#98BCE5] hover:text-white text-sm ml-2 font-medium transition"
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

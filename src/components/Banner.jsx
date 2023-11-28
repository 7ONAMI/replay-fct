

export const Banner = () => {
  return (
    <div className="h-72 text-white  flex items-center place-items-center" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(/images/hero_bg.jpg)`}} >
        {/* <img className="w-full max-h-" src="/images/hero_bg.jpg" alt="background image" /> */}
        <h3 className=" font-bold w-full text-center text-xl shadow-sm">ENCUENTRA LA ESPERIENCIA AUDIOVISUAL IDEAL</h3>
    </div>
  )
}

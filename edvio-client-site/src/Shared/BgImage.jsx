
export default function BgImage({bgImg,children,height}) {
  const bgStyle = {
    backgroundImage: `url(${bgImg})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // backgroundAttachment: "fixed",
    height : height, 
    }
  return (
    <div style={bgStyle} className="w-full overflow-hidden">
    {children}
    </div>
  )
}
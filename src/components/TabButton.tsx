
const TabButton = (props) => {
  return (
    <div className={"half-width text-center padding-1 uppercase cursor-pointer " + (props.isActive ? 'bg-active color-white' : 'bg-inactive')} onClick={props.handleClick}>
      <h2 className="font-subtitle">{ props.name }</h2>
      
    </div>
  )
}

export default TabButton
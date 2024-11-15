import { Checkbox } from "@/components/ui/checkbox"



export function CheckboxDisabled(props) {

  const handleClick = (e) => {
    console.log(e);
    console.log("clicked");
    alert(`You Accepted terms and conditions for ${props.product}`);
  };


  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" abled onClick={handleClick}/>
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}

export default CheckboxDisabled;
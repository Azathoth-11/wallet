export default function InputBox(props){
    return(
        <div className="text-center">
            <h3 className="">{props.name}</h3>
            <input type="text" placeholder={props.placeholder} />
        </div>
    )

}
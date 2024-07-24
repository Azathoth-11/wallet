export default function Button(props){
    return (
        <div className="text-center">
            <button className="border rounded-md bg-black text-white m-1 p-2">{props.name}</button>
        </div>
    )
}
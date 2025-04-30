import Button from "../components/form/button";
import EmptyIcon from "../assets/icons/empty";

export default function App(){
    return (
        <div className="m-4 md:m-6 p-6 md:p-10 bg-white shadow- rounded-xl h-screen">

            <h2 className="heading-M">Customize your links</h2>
            <p className="body-M">Add/edit/remove links below and then share all your profiles with the world!</p>

            <div className="flex flex-col gap-10 items-center justify-center">
                <Button name=" + Add new link" className="bg-white border text-purple-1000 p-3" />
                <EmptyIcon />

                <h3 className="heading-M">Let's get you started</h3>
                <p>Use the 'Add new link' button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                <Button name="Save" className="bg-purple-1000/25 md:w-24 rounded-lg md:rounded-xl md:h-12 text-white md:ml-auto"/> 
            </div>
        </div>
    )
}
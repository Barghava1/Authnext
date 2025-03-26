export default function Userprofile({params}:any)
{
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen"> 
            <h1 className="text-center" >Profile </h1>
            <br/>
            <p className="text-3xl ">Profile  page 
                <span className="bg-amber-500 text-3xl text-black p-2 ml-2">{params.id}</span>
                </p>
               
        </div>
        </>
    )
}
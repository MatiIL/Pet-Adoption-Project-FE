import { useAuthContext } from "../context/AuthContext";

function HomePage() {
    const { auth, loggedUser } = useAuthContext();
    const userName = loggedUser.firstName;
   
    return (
        <div className="wrapper d-flex flex-column justify-content-around">
        <div className="mt-4"><h1>
            {auth? `Welcome ${userName}!` : "Welcome To The Site!"}
            </h1></div>
        <div className="mt-3 w-50 text-center align-self-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ea est incidunt? Vel modi placeat quisquam ipsum beatae! Accusantium alias vel ex tempore illum molestias quisquam repellendus, architecto rerum obcaecati!</div>
        </div>
    )
}

export default HomePage;
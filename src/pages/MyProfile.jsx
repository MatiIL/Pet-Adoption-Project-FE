import SignupForm from '../components/SignupForm';

function MyProfile() {
    return (
        <div className="d-flex flex-column justify-content-between">
    <h1 className='mt-3 mb-5'>Profile Settings</h1>
        <SignupForm className="d-flex justify-content-evenly"/>
        </div>
    )
}

export default MyProfile;
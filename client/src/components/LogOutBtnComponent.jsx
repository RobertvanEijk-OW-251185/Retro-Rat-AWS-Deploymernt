import "./LogOutBtnComponent.css";

function LogoutBtnComp({ onLogout }) {
	return (
		<button className="logoutBtn" onClick={onLogout}>
			Log Out
			{/* <span className="logout-btn-text">LogOut</span> */}
		</button>
	);
}

export default LogoutBtnComp;

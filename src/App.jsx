import React, { useState } from "react";
import { useMsal, MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { ApiData } from "./components/APIData";
import { getApiData } from "./api";
import "./styles/App.css";

/**
 * Renders name of the signed-in user and a button to retrieve data from an API
 */
const AppContent = () => {
	const { instance, accounts } = useMsal();
	const [apiData, setApiData] = useState(null);

	const [data, setData] = useState();
	const [loadingSearch, setLoadingSearch] = useState();

	const onSearch = (searchType, searchData) => {
		setLoadingSearch(true);
		getApiData(searchType, searchData).then((apiData) => {
			setData(apiData);
			setLoadingSearch(false);
		});
	};

	return (
		<div className="App">
			<h1>Welcome to instance {accounts[0]}</h1>
			<Searchbar
				onSubmit={(type, data) => onSearch(type, data)}
				loading={loadingSearch}
			/>
			<ApiData data={data} setData={(v) => setData(v)} />
		</div>
	);
};

/**
 * If a user is authenticated the AppContent component above is rendered. Otherwise the content is not rendered.
 */
const MainContent = () => {
	return (
		<div className="App">
			{
				<MsalAuthenticationTemplate
					interactionType={InteractionType.Redirect}
					authenticationRequest={loginRequest}
				>
					<AppContent />
				</MsalAuthenticationTemplate>
			}
		</div>
	);
};

export default function App() {
	return (
		<PageLayout>
			<MainContent />
		</PageLayout>
	);
}

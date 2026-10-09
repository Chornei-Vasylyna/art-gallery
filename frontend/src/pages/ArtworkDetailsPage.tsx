import { useParams } from "react-router-dom";

export const ArtworkDetailsPage = () => {
	const { id } = useParams<{ id: string }>();

	return <h1>ArtworkDetailsPage: {id}</h1>;
};

import "./ApiData.css";

/**
 * Renders data retrieved from API
 * @param {{data: Record<string, string|number>}} props
 */
function ApiData({ data }) {
	if (data === undefined) return <p>No data retrieved from API</p>;

	if (data.error) return <p className="text-danger">Error: {data.error}</p>;

	console.log(data);

	const { status, ...idData } = data;

	return (
		<table className="data-table">
			<tr>
				{Object.keys(idData).map((h) => (
					<th key={h}>{h}</th>
				))}
				<th>status</th>
			</tr>
			<tbody>
				<tr>
					{Object.keys(idData).map((k) => (
						<td key={k}>{idData[k]}</td>
					))}
					<td>
						{status}
						<span
							className={`ps-2 ${
								status === "found" ? "fw-bold text-success" : "text-danger"
							}`}
							// onClick={() => toggleFound()}
						>
							{status === "found" ? "✓" : "✘"}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default ApiData;

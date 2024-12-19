export default function userprofile(
    {params} : any
) {
    return (
        <div>
            <h1>profile page</h1>
            <h3>{params.id}</h3>
        </div>
    );
}
// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     // Array of elements is used when returning multiple sibling elements
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

//JSX syntax
const Pizza = (props) => {
    return (
        <div className="pizza">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <img src={props.image} alt={props.name} />
        </div>
    );
};

export default Pizza;

// Name export.
// export const Pizza = (props) => {
//     return (
//         <div className="pizza">
//             <h1>{props.name}</h1>
//             <p>{props.desicption}</p>
//         </div>
//     )
// }

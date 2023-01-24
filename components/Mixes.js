import Mix from './Mix.js';

const Mixes = ({ mixes }) => {
  // const orderedMixes = mixes.sort(function (a, b) {
  //   return b.cat - a.cat;
  // });

  return (
    <div className="mixes">
      {mixes.map((mix) => (
        <Mix key={mix.id} mix={mix.attributes} />
      ))}
    </div>
  );
};

export default Mixes;

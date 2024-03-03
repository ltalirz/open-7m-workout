import PropTypes from "prop-types"; 

const SetIndicator = ({currentSet, totalSets}) => {
  let sets = [<span key="Set-text">Set</span>];
  for (let i = 0; i < totalSets; i++) {
    sets.push(
      <span 
        key={i+1} 
        style={{ 
          padding: '5px 10px', 
          margin: '0 5px', 
          backgroundColor: currentSet === i ? 'red' : 'grey', 
          color: '#fff' 
        }}
      >
        {i+1}
      </span>
    );
  }
  return sets;
};

// Define PropTypes for Timer
SetIndicator.propTypes = {
  currentSet: PropTypes.number.isRequired,
  totalSets: PropTypes.number.isRequired
};

export default SetIndicator;

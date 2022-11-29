const power = 100;
let secvolt = 100;

// --------------------------------------------------------------------------
const calculatePrimaryCurrent = (voltage, power) => {
    return (power / voltage).toFixed(2);
};

const calculateSecondaryVoltage = (
    coilPrimary,
    coilSecondary,
    voltagePrimary
) => {
    return (voltagePrimary * coilSecondary) / coilPrimary;
};

const calculateSecondaryCurrent = (voltagePrimary, currentPrimary) => {
    return (voltagePrimary * currentPrimary) / secvolt;
};

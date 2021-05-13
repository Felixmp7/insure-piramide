/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';

const Assured = ({
    documentId,
    name,
    assured,
    assureCoverage,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const rotateButton = isOpen ? '' : 'origin-center transform rotate-180';

    return (
        <div className="my-5 text-sm">
            <div className="grid items-center w-full grid-cols-4 transition duration-500 border hover:bg-yellow-100 ease">
                <span className="flex items-center">
                    <IconButton
                        className={`focus:outline-none ${rotateButton}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-label="show more"
                    >
                        <ExpandLess />
                    </IconButton>
                    <span className="ml-4">{documentId}</span>
                </span>
                <span className="col-span-2 mx-auto">{name}</span>
                <span className="mx-auto">{assured}</span>
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit className="border border-t-0">
                <List component="ul" disablePadding>
                    {assureCoverage.map((coverage, index) => (
                        <li key={index} className="px-4 py-2 border-t ">
                            {coverage}
                        </li>
                    ))}
                </List>
            </Collapse>
        </div>
    );
};

Assured.propTypes = {
    documentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    assured: PropTypes.string.isRequired,
    assureCoverage: PropTypes.instanceOf(Array).isRequired,
};

export default Assured;

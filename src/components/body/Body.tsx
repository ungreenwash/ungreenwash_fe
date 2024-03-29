import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import MuiMarkdown from 'mui-markdown';
import Box from '@mui/material/Box';
import "./Body.css"
import { Companies } from '../companies/Companies';
import { Filter } from '../filter/Filter';
import { QuestionInput } from '../questionInput/QuestionInput';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { CompanyResults } from '../companyResults/CompanyResults';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useEffect } from 'react';
import { getBaseQAs, baseQAs, isLoadingState } from './bodySlice';
import { selectCompare } from '../settings/settingsSlice';

export function Body() {
    const dispatch = useAppDispatch();

    const baseCompanyQAs = useAppSelector(baseQAs);

    const comparisonMode = useAppSelector(selectCompare);

    const isLoading = useAppSelector(isLoadingState);


    return (
    <div className="body">
        <div className="section">
            <div className="filter">
                <Filter />
            </div>
        </div>
        <div>
            <div className="section adjustments">
                <div className="question">
                    <QuestionInput />
                </div>
            </div>
            
            {comparisonMode ? 
                <div className="section">
                    <Companies companies={baseCompanyQAs} />      
                </div>
            : 
                <div className="section">
                    <CompanyResults companies={baseCompanyQAs} />
                </div>
            }        
        </div>
        
    </div>
    );
}
  

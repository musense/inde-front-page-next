import React, { useCallback } from 'react'

import styles from './dateTimeStamp.module.css'

const dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};
const timeOption = {
    hour: '2-digit',
    hour12: false,
    hourCycle: 'h24',
    minute: '2-digit',
};

export default function DateTimeStamp({ date }) {
    const d = new Date(date);
    const f = new Intl.DateTimeFormat('en-in', { ...dateOption, ...timeOption }).formatToParts(d);
    const getDateParts = useCallback((type) => {
        const t = f.find(part => part.type === type)
        return t.value
    }, [f])
    const formattedDateString = `${getDateParts('day')}-${getDateParts('month')}-${getDateParts('year')} ${getDateParts('hour')}:${getDateParts('minute')}`
    return date && (<div className={styles['title-main-date']}>
        <span className={styles['create-date']}>
            {formattedDateString}
        </span>
    </div>);
}
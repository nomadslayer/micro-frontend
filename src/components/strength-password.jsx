const hasSpecial = value => {
    return new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{11,})/).test(value);
}

export const strengthColor = count => {

    if (count < 2)
        return 'red';

    if (count < 3)
        return 'yellow';

    if (count < 4)
        return 'orange';

    if (count < 5)
        return 'lightgreen';

    if (count < 6)
        return 'green';
}

export const strengthIndicator = value => {
    let strengths = 0;

    if (value.length > 5)
        strengths++;

    if (value.length > 6)
        strengths++;

    // if (hasNumber(value))
    //     strengths++;

    // if (hasSpecial(value))
    //     strengths++;

    // if (hasMixed(value))
    //     strengths++;

    if (hasSpecial(value))
         strengths++;

    return strengths;
}
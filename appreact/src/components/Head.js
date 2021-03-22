import React from 'react'

const Head = (props) => {
    React.useEffect(() => {
        document.title = props.title
        document
            .querySelector('meta[name="description"]')
            .setAttribute('content', props.description)

            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = 'https://www.flaticon.com/svg/vstatic/svg/954/954497.svg?token=exp=1616155922~hmac=9e2e14de963464a78e9a59c78d7d6fc0';
            document.getElementsByTagName('head')[0].appendChild(link);
    }, [props])

    return (
        <></>
    )

    return <></>
}

export default Head

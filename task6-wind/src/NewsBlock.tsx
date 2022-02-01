import './NewsBlock.css';

function NewsBlock(p: { date: string, tags: string[], img: string, text: string, postlink: string }): JSX.Element {
    return (
        <div className="newsBlock w-auto h-auto mb-24 sm:mb-28 xl:mb-36">
            <div className="flex flex-col sm:flex-row flex-nowrap overflow-hidden">
                <div className='ml-5 sm:ml-0 flex flex-col flex-wrap place-content-between order-2'>
                    <div className="post__date pb-5 sm:pb-12">
                        {p.date}
                    </div>

                    <div className="post__text min-w-min place-self-center pb-7 sm:pb-48">
                        <a href={p.postlink} className="post__link">
                            {p.text}
                        </a>
                    </div>

                    {p.tags.length > 0 ?
                        <ul className="post_tag__item flex flex-row flex-nowrap items-center mb-1">
                            {p.tags.map((tag: string, index: number) => (
                                <li className="mr-4">
                                    <a href={"#" + tag} className="tag__link">{tag}</a>
                                </li>
                            ))}
                        </ul>
                        : ""
                    }
                </div>

                <div className="ml-0 mr-0 sm:mr-32  order-1 mb-7 sm:mb-0 sm:order-3 place-self-center">
                    <a href={p.postlink} >
                        <img className="postimg" src={p.img} alt="Фото 'Макс Фрай'" />
                    </a>
                </div>

                <div className="post__arrow relative -left-24 order-4">
                    <svg className="post__arrow-link" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#323749" stroke-width="2" stroke-linejoin="round">
                        <path d="M12 17L19 10L12 3"></path>
                        <path d="M5 10L19 10"></path>
                    </svg>
                </div>

            </div>

        </div>
    )





}

export default NewsBlock;
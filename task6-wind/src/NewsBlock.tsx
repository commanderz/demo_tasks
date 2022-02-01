import './index.css';
import './NewsBlock.css';

interface ITags {
    slug: string,
    label: string
}
interface IProps {
    date: string,
    tags: ITags[],
    img: string,
    text: string,
    postlink: string
};

function NewsBlock(props: IProps): JSX.Element {
    return (
        <div className="newsBlock w-auto h-auto mb-28 sm:mb-32 md:mb-36 xl:mb-40" >
            <div className="flex flex-col md:flex-row flex-nowrap overflow-hidden">
                <div className='ml-5 sm:ml-14 md:ml-0 flex flex-col flex-wrap place-content-between order-3'>
                    <div className="post__date pb-5 md:pb-12">
                        {props.date}
                    </div>

                    <div className="post__text min-w-min place-self-center pb-7 md:pb-48">
                        <a href={props.postlink} className="post__link">
                            {props.text}
                        </a>
                    </div>

                    {(props.tags.length > 0) && (
                        <ul className="post_tag__item flex flex-row flex-nowrap items-center mb-1">
                            {props.tags.map((tag: ITags, index: number) => (
                                <li className="mr-4">
                                    <a href={tag.slug} className="tag__link">{tag.label}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="ml-0 mr-0 md:mr-32  order-1 mb-7 md:mb-0  md:order-4 place-self-center">
                    <a href={props.postlink} >
                        <img className="postimg" src={props.img} alt="Фото 'Макс Фрай'" />
                    </a>
                </div>

                <div className="post__arrow relative -left-24 order-2 sm:left-0 md:-left-24 md:order-5 ">
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
import {Text, Button} from "../../components";

const HeroSlide = (props) => {
    const {backgroundImage, cta, text} = props;
    const {alt, caption, description, ID, name, src, title, type} = backgroundImage;
    const {body, heading, subheading} = text;
    const {link, target, value} = cta;
    return (
        <div className={`m-auto h-full flex flex-row justify-center items-center flex-shrink-0 w-full`}>
            <div
                className={`relative h-full flex-grow rounded-lg flex flex-col items-center justify-center gap-2 lg:gap-4`}>
                <div className="z-10 max-w-[80%] lg:max-w-[50%]">
                    <div className="p-4 text-neutral-content bg-neutral/90 rounded-lg drop-shadow-sm flex flex-col gap-4">
                        <Text tag={'h1'}>{heading}</Text>
                        <Text tag={'h3'}>{subheading}</Text>
                        <Text tag={'p'}>{body}</Text>
                        {
                            link.length > 0 &&
                            <Button.LinkButton url={link}>{value.length > 0 ? value : 'Learn More'}</Button.LinkButton>

                        }
                    </div>
                </div>
                <div
                    className={'h-full w-full min-w-96 absolute top-0'}
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default HeroSlide;

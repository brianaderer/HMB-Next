import {Text, Media} from "../../components";

const HeroSlide = (props) => {
    const {backgroundImage, cta, text} = props;
    const {alt, caption, description, ID, name, src, title, type} = backgroundImage;

    return (
        <div className={`m-auto h-full flex flex-row justify-center items-center flex-shrink-0 w-full`}>
            <div
                className={`h-full flex-grow rounded-lg flex flex-col items-center justify-center gap-2 lg:gap-4`}>
                <div
                    className={'h-full w-full min-w-96'}
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

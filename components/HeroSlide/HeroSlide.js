import { Text, Button } from "../../components";

const HeroSlide = (props) => {
    const { backgroundImage, cta, text } = props;
    const { src, type } = backgroundImage;
    const { body, heading, subheading } = text;
    const { link, value } = cta;

    return (
        <div className="m-auto h-full flex flex-row justify-center items-center flex-shrink-0 w-full">
            <div className="relative h-full flex-grow rounded-lg flex flex-col items-center justify-center gap-2 lg:gap-4">
                {/* Content */}
                <div className="z-10 max-w-[95%] md:max-w-[80%] lg:max-w-[50%]">
                    <div className="p-4 text-neutral-content bg-neutral/90 rounded-lg drop-shadow-sm flex flex-col gap-4">
                        <Text className={'!text-md !lg:text-xl'} tag="h1">{heading}</Text>
                        <Text className={'!text-md !lg:text-lg'} tag="h3">{subheading}</Text>
                        <Text className={'!text-sm !lg:text-md'} tag="p">{body}</Text>
                        {link?.length > 0 && (
                            <Button.LinkButton url={link} className={'bg-accent'}>
                                {value?.length > 0 ? value : "Learn More"}
                            </Button.LinkButton>
                        )}
                    </div>
                </div>

                {/* Background */}
                <div className="h-full w-full absolute top-0">
                    {type.startsWith("image/") ? (
                        <div
                            className="h-full w-full bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundPosition: 'center',
                            }}
                        ></div>
                    ) : type.startsWith("video/") ? (
                        <video
                            className="h-full w-full object-cover"
                            src={src}
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default HeroSlide;

import {Text} from "../../components";

const HeroSlide = (props) => {
    const {content} = props;
    console.log(content);
    return (
        <div className={`m-auto h-full flex flex-row justify-center items-center flex-shrink-0 w-full`}>
            <div
                className={`h-full w-full px-4 pt-8 lg:px-[10%] flex-grow rounded-lg flex flex-col items-center justify-center mb-12 lg:mx-10 gap-2 lg:gap-4`}>
                <Text tag={'p'} className={`lg:text-center text-sm`}>Slide</Text>
            </div>
        </div>
    )
}
export default HeroSlide;
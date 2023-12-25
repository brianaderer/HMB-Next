const Tag = props => {
    const {children} = props;
    return (
        <div className="w-full flex grow items-center rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col p-0.5 m-1">
            <div className="flex h-full grow w-full flex-col items-center justify-center gap-4 p-1">
                <p className="text-md text-center m-0"> {children} </p>
            </div>
        </div>
    )
}
export default Tag;
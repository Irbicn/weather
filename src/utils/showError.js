const showError = (err, container) =>{
    const error = document.createElement('div');
        error.className = "error-notFound";
        error.textContent = err;

    const Public = {
        add(){
            error.remove();
            container.appendChild(error);
            setTimeout(() => {
                error.remove();
            }, 1000);
        },
        remove(){
            error.remove();
        }
    };
    return Public;
}
export default showError;
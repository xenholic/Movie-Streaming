import swal from "sweetalert";

export const showError = async (err) => {
    const error = await err.text();
    return swal("Error", JSON.parse(error).error.message, "error");
};

export const showSuccess = async (msg) => {
    return swal(msg, "", "success");
};
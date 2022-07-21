export const DeleteModal = () => {
  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <h4>Delete the Survey</h4>
        <p>This cannot be undone</p>
      </div>
      <div className="modal-footer">
        <a className="modal-close waves-effect btn-flat">Ok</a>
      </div>
    </div>
  );
};

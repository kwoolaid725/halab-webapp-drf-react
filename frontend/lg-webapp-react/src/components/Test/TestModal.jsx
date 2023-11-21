import React, { useState } from "react";

import "./TestModal.css";

export const TestModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      slug: "",
      test_group: "",
      tester: "",
      soil_weight: "",
      vac_weight_i: "",
      vac_weight_f: "",
      vac_weight_diff: "",
      pickup: "",
      run: "",
      remarks: "",
      created_at: "",
      last_updated: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.tester && formState.test_group && formState.run) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="slug">Row ID</label>
            <input
              name="slug"
              onChange={handleChange}
              value={formState.slug} />
          </div>
          <div className="form-group">
            <label htmlFor="test_group">Test Group</label>
            <input
              name="test_group"
              onChange={handleChange}
              value={formState.test_group} />
          </div>
          <div className="form-group">
            <label htmlFor="tester">Tester</label>
            <input
              name="tester"
              onChange={handleChange}
              value={formState.tester} />
          </div>
          <div className="form-group">
            <label htmlFor="soil_weight">Soil Weight</label>
            <input
              name="soil_weight"
              onChange={handleChange}
              value={formState.soil_weight} />
          </div>
          <div className="form-group">
            <label htmlFor="vac_weight_i">Initial Vacuum Weight</label>
            <input
              name="vac_weight_i"
              onChange={handleChange}
              value={formState.vac_weight_i} />
          </div>
          <div className="form-group">
            <label htmlFor="vac_weight_f">Final Vacuum Weight</label>
            <input
              name="vac_weight_f"
              onChange={handleChange}
              value={formState.vac_weight_f} />
          </div>
          <div className="form-group">
            <label htmlFor="vac_weight_diff">Vacuum Weight Difference</label>
            <input
              name="vac_weight_diff"
              onChange={handleChange}
              value={formState.vac_weight_diff} />
          </div>
          <div className="form-group">
            <label htmlFor="pickup">Pickup %</label>
            <input
              name="pickup"
              onChange={handleChange}
              value={formState.pickup} />
          </div>
          <div className="form-group">
            <label htmlFor="run">Run</label>
            <input
              name="run"
              onChange={handleChange}
              value={formState.run} />
          </div>
          <div className="form-group">
            <label htmlFor="remarks">Remarks</label>
            <input
              name="remarks"
              onChange={handleChange}
              value={formState.remarks} />
          </div>
          <div className="form-group">
            <label htmlFor="created_at">Created at</label>
            <input
              name="created_at"
              onChange={handleChange}
              value={formState.created_at} />
          </div>
          <div className="form-group">
            <label htmlFor="last_updated">Last Updated</label>
            <input
              name="last_updated"
              onChange={handleChange}
              value={formState.last_updated} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);

  async function shareOptionAction(prevState, formData) {
    const title = formData.get("title");
    const userName = formData.get("userName");
    const body = formData.get("body");

    let errors = [];
    if (!title || title.trim().length < 5) {
      errors.push("Title must be at least 5 characters long.");
    }
    if (!userName || userName.trim().length < 3) {
      errors.push("User name must be at least 3 characters long.");
    }
    if (!body || body.trim().length < 10) {
      errors.push("Opinion body must be at least 10 characters long.");
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { title, userName, body } };
    }

    await addOpinion({ title, userName, body});

    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOptionAction, {
    errors: null,
    enteredValues: { title: "", userName: "", body: "" },
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>

      {/* Use formAction, not shareOptionAction */}
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>

        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((errMsg, index) => (
              <li key={index}>{errMsg}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}

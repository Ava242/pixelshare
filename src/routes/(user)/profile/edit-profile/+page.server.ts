import { fail, redirect } from "@sveltejs/kit";
import { v4 } from "uuid";

export const actions = {
    default: async ({ request, params, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const userId=formData.get("userId") as string;
        const username = formData.get("username") as string;
        const location = formData.get("location") as string;
        const bio= formData.get("bio") as string;
        const phonenumber= formData.get("phonenumber") as string;

        

        const {
			data: { user },
			error: err1,
		} = await supabase.auth.getUser();

		if (err1 || !user) {
			return redirect(302, "/login");
		}

		const session = await getSession();
		if (!session) {
			return redirect(302, "/login");
		}

        
        // Common formData
       console.log("Action received:",username, "bio:", bio);

       const { data, error } = await supabase.rpc("edit_profile", {
        user_id:userId,
        user_name:username,
        bio2:bio,
        location2:location,
        phone_number:phonenumber,
    });

    if (error) {
        console.log("Error editing profile", error);
        return fail(400, { error: error.message });
    }

        
            return { success: true };
        // }

    },


};

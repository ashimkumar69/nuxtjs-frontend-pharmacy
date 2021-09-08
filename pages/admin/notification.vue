<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            v-model="selected"
            show-select
            :headers="headers"
            :items="notification"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Notifications</v-toolbar-title>
              </v-toolbar>
            </template>
            <!-- <template v-slot:item.actions="{ item }">
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>-->
            <template v-slot:no-data>No Data</template>
            <template v-slot:body.append v-if="selected.length > 0">
              <v-btn icon class="ml-3">
                <v-icon color="red" small @click="deleteItem">fas fa-trash</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
// import { mapGetters } from "vuex";
export default {
  name: "Notification",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Subject", value: "subject" },
        { text: "Created At", value: "created_at" },
      ],
      notification: [],
      selected: [],
    };
  },
  async asyncData({ store, $axios }) {
    try {
      const notification = await $axios.$get("/notification");

      store.dispatch("user/fetchUser");
      return {
        notification: notification.map((element) => {
          return {
            id: element.id,
            type: element.type,
            name: element.data.notification.name,
            subject: element.data.notification.subject,
            created_at: element.data.notification.created_at,
          };
        }),
      };
    } catch (error) {
      console.log(error);
    }
  },
  // created() {
  //   this.$store.dispatch("contacts/fetchContacts");
  // },
  // computed: {
  //   ...mapGetters({ contacts: "contacts/getContacts" }),
  // },
  methods: {
    deleteItem(item) {
      this.$toast.error("Are you sure you want to delete this item?", {
        action: [
          {
            text: "Delete",
            onClick: (e, toastObject) => {
              this.$axios
                .$post("notificationDelete", { selected: this.selected })
                .then((res) => {
                  this.selected = [];
                  this.notification = res.map((element) => {
                    return {
                      id: element.id,
                      type: element.type,
                      name: element.data.notification.name,
                      subject: element.data.notification.subject,
                      created_at: element.data.notification.created_at,
                    };
                  });
                  toastObject.goAway(0);
                  this.$toast.success("Successfully Notification Deleted", {
                    duration: 5000,
                    action: {
                      text: "Cancel",
                      onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                      },
                    },
                  });
                })
                .catch((error) => {
                  console.log(error);
                });
            },
          },
          {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    },
  },
};
</script>
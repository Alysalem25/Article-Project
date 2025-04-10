<template>
  <div>
    <navbar />
    <dashbord />

    <div class="container m-0">
      <div class="announcement-form">
        <div class="header">
          <h2>اضافة مقال</h2>
        </div>

        <div
          class="row mt-5 text-white d-flex flex-column flex-md-row justify-content-between"
        >
          <!-- Image Upload with Drag & Drop -->
          <div class="col">
            <div
              class="mb-3 drop-zone"
              @drop.prevent="handleDrop"
              @dragover.prevent
            >
              <label for="file-upload" class="form-label">صورة الغلاف</label>
              <input
                id="file-upload"
                type="file"
                @change="previewImage"
                accept="image/*"
                class="form-control rounded-0"
              />
              <p>اسحب الصورة هنا أو اضغط لاختيارها</p>
              <small v-if="errors.image" class="text-danger">{{
                errors.image
              }}</small>
              <img
                v-if="imagePreview"
                :src="imagePreview"
                class="img-preview mt-2"
                alt="Preview"
              />
            </div>
          </div>

          <!-- Article Title -->
          <div class="col">
            <div class="mb-3">
              <label class="form-label">عنوان المقال</label>
              <input
                type="text"
                v-model="title"
                class="form-control rounded-0"
              />
              <small v-if="errors.title" class="text-danger">{{
                errors.title
              }}</small>
            </div>
          </div>

          <!-- Article Topic -->
          <div class="col">
            <div class="mb-3">
              <label class="form-label">موضوع المقال</label>
              <div
                v-for="(label, index) in topics"
                :key="index"
                class="form-check"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  :id="'topic-' + index"
                  :value="label"
                  v-model="topic"
                />
                <label class="form-check-label" :for="'topic-' + index">{{
                  label
                }}</label>
              </div>
              <small v-if="errors.topic" class="text-danger">{{
                errors.topic
              }}</small>
            </div>
          </div>
        </div>

        <!-- Text Editor -->
        <div class="form-content my-5">
          <div class="d-flex justify-content-center">
            <div class="text_editor">
              <div id="toolbar-container"></div>
              <div class="editor-container" ref="editorContainer"></div>
              <small v-if="errors.content" class="text-danger">{{
                errors.content
              }}</small>
            </div>
          </div>
        </div>

        <!-- Publish Button -->
        <div class="row justify-content-center">
          <button
            @click="publish"
            class="badge v_button rounded-0"
            :disabled="isPublishing"
          >
            <span v-if="isPublishing">جاري النشر...</span>
            <span v-else>نشر</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashbord from "@/components/side_bar/dashbord.vue";
import navbar from "@/components/side_bar/navbar.vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

export default {
  components: { dashbord, navbar },
  data() {
    return {
      title: localStorage.getItem("draftTitle") || "",
      topic: localStorage.getItem("draftTopic") || "",
      imagePreview: "",
      selectedImage: null,
      editorInstance: null,
      isPublishing: false,
      topics: ["لغه", "موسيقي", "فلسفه", "قرائه", "أدب", "فن"],
      errors: { title: "", topic: "", image: "", content: "" },
    };
  },
  mounted() {
    this.editorInstance = new Quill(this.$refs.editorContainer, {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      placeholder: " ..... اكتب مقال",
      theme: "snow",
    });
    this.editorInstance.root.innerHTML =
      localStorage.getItem("articleContent") || "";
    setInterval(
      () =>
        localStorage.setItem(
          "articleContent",
          this.editorInstance.root.innerHTML
        ),
      10000
    );
  },
  watch: {
    title(newVal) {
      localStorage.setItem("draftTitle", newVal);
    },
    topic(newVal) {
      localStorage.setItem("draftTopic", newVal);
    },
  },
  methods: {
    previewImage(event) {
      const file = event.target.files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      const maxWidth = 1000; // Max width in pixels
      const maxHeight = 1000; // Max height in pixels

      if (file) {
        if (file.size > maxSize) {
          alert("حجم الصورة كبير جدًا! الرجاء اختيار صورة أقل من 2MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
            if (img.width > maxWidth || img.height > maxHeight) {
              alert(
                `أبعاد الصورة كبيرة جدًا! يجب أن تكون أقل من ${maxWidth}x${maxHeight} بكسل.`
              );
              return;
            }

            // If the image is valid, store the preview
            this.selectedImage = file;
            this.imagePreview = e.target.result;
          };
        };

        reader.readAsDataURL(file);
      }
    },

    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) this.previewImage({ target: { files: [file] } });
    },
    validateForm() {
      this.errors = { title: "", topic: "", image: "", content: "" };
      let isValid = true;
      if (!this.title.trim()) {
        this.errors.title = "عنوان المقال مطلوب";
        isValid = false;
      }
      if (!this.topic) {
        this.errors.topic = "موضوع المقال مطلوب";
        isValid = false;
      }
      if (!this.selectedImage) {
        this.errors.image = "يرجى إضافة صورة الغلاف";
        isValid = false;
      }
      const content = this.editorInstance.getText().trim();
      if (content.split(/\s+/).length < 100) {
        this.errors.content = "يجب أن يكون المقال على الأقل 100 كلمة.";
        isValid = false;
      }
      return isValid;
    },
    async publish() {
      if (!this.validateForm()) return;
      if (!confirm("هل أنت متأكد من نشر المقال؟")) return;

      this.isPublishing = true;

      try {
        const content = this.editorInstance.root.innerHTML;
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", content);
        formData.append("topic", this.topic);
        formData.append("status", "pending");

        if (this.selectedImage) {
          formData.append("image", this.selectedImage);
        }

        // ✅ Retrieve the correct User ID instead of the token
        const authorId = localStorage.getItem("userId");
        if (!authorId) throw new Error("لم يتم العثور على هوية المؤلف!");

        formData.append("author", authorId);

        // ✅ Send the article data
        await axios.post("http://localhost:5000/articles", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("تم نشر المقال بنجاح!");
      } catch (error) {
        console.error("خطأ في النشر:", error.response?.data || error.message);
        alert(`خطأ في النشر: ${error.message}`);
      } finally {
        this.isPublishing = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 85%;
  margin-top: 50px !important;
  padding: 10px 35px;
}
.announcement-form {
  background-color: #7ca8b6;
  direction: rtl;
  border-radius: 5px;
  padding: 20px;
}
.header {
  background-color: #0b3643;
  padding: 20px;
  color: white;
  text-align: center;
  font-weight: 800;
}
.img-preview {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.ql-editor {
  text-align: end !important;
}
.text_editor {
  height: 200px;
  direction: ltr;
  width: 100%;
  background-color: white;
}
.v_button {
  width: 30vw;
  padding: 10px 30px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: var(--main-color);
  border: 2px solid var(--main-color);
  margin-top: 40px;
}
.text-danger {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.ql-toolbar.ql-snow {
  background-color: #ffca27;
}
</style>

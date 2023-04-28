<template>
  <VSheet tag="section">
    <div class="text-h4">Profesional Summary</div>
    <div class="text-body-1 text-wrap mb-4">
      Write 2-4 short & energetic sentences to interest the reader! Mention your role,
      experience & most important - your biggest achivements, best qualities and skills.
    </div>

    <ClientOnly>
      <EditorTinymce
        v-model="summary"
        :api-key="apiKey"
        :init="options"
      />
    </ClientOnly>
  </VSheet>
</template>

<script>
import EditorTinymce from "@tinymce/tinymce-vue";
export default {
  components: { EditorTinymce },
  data: () => ({
    summary: null,
    apiKey: 'no-api-key',
    options: {
      width: '100%',
      selector: 'textarea',
      resize: 'both',
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help'
    }
  })
}
</script>

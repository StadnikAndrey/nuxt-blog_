import FingerprintJS from "@fingerprintjs/fingerprintjs";
export default {
  methods: {
    async fingerprint() {
      const fpPromise = FingerprintJS.load({
        monitoring: false,
      });
      const fp = await fpPromise;
      const result = await fp.get();
      return result.visitorId;
    },
  }
}
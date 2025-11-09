import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Github, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContact = useMutation(api.contact.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContact(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00BFFF] to-[#ff0080] bg-clip-text text-transparent">Great Together</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Have a project idea or a job opportunity? I'd love to hear from you.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="bg-[#111111] border-[#00ff88]/20 hover:border-[#00BFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-white font-medium mb-2 block">
                          Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="bg-[#0a0a0a] border-[#00ff88]/20 text-white focus:border-[#00BFFF] transition-colors"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-white font-medium mb-2 block">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="bg-[#0a0a0a] border-[#00ff88]/20 text-white focus:border-[#00BFFF] transition-colors"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="text-white font-medium mb-2 block">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="bg-[#0a0a0a] border-[#00ff88]/20 text-white focus:border-[#00BFFF] transition-colors"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="text-white font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        required
                        rows={6}
                        className="bg-[#0a0a0a] border-[#00ff88]/20 text-white focus:border-[#00BFFF] transition-colors resize-none"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#00BFFF] text-white hover:bg-[#00BFFF]/90 shadow-[0_0_20px_rgba(0,191,255,0.3)] hover:shadow-[0_0_30px_rgba(0,191,255,0.5)] font-semibold transition-all duration-300"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 animate-spin" size={20} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2" size={20} />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-[#111111] border-[#00ff88]/20 hover:border-[#00BFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <motion.a
                      href="mailto:saieshsasane@gmail.com"
                      className="flex items-center text-gray-400 hover:text-[#00BFFF] transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 bg-[#00BFFF]/10 border border-[#00BFFF]/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#00BFFF]/20 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] transition-all">
                        <Mail size={20} className="text-[#00BFFF]" />
                      </div>
                      <span className="text-sm">saieshsasane@gmail.com</span>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111111] border-[#00ff88]/20 hover:border-[#00BFFF] hover:shadow-[0_0_30px_rgba(0,191,255,0.2)] transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Connect With Me
                  </h3>
                  <div className="space-y-3">
                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-[#ff0080] transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 bg-[#ff0080]/10 border border-[#ff0080]/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#ff0080]/20 group-hover:shadow-[0_0_15px_rgba(255,0,128,0.3)] transition-all">
                        <Github size={20} className="text-[#ff0080]" />
                      </div>
                      <span className="text-sm">GitHub Profile</span>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProjectsGallery from "@/pages/ProjectsGallery";
import { Seo } from "@/seo/Seo";
import { DEFAULT_DESCRIPTION, DOCUMENT_SITE_TITLE } from "@/seo/config";

describe("route smoke", () => {
  it("home Seo matches live Index head tags (title + description)", async () => {
    render(
      <HelmetProvider>
        <Seo
          title="Developer, UI animator, and competitive programmer"
          description={DEFAULT_DESCRIPTION}
          pathname="/"
        />
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.title).toBe(DOCUMENT_SITE_TITLE);
    });
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      DEFAULT_DESCRIPTION,
    );
  });

  it("projects page shows gallery heading and document title", async () => {
    render(
      <HelmetProvider>
        <TooltipProvider>
          <MemoryRouter initialEntries={["/projects"]}>
            <Routes>
              <Route path="/projects" element={<ProjectsGallery />} />
            </Routes>
          </MemoryRouter>
        </TooltipProvider>
      </HelmetProvider>,
    );

    expect(await screen.findByRole("heading", { name: /All projects/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe(DOCUMENT_SITE_TITLE);
    });
  });

  it("App module loads (regression: providers + router entry)", async () => {
    const { default: App } = await import("@/App");
    expect(App).toBeTypeOf("function");
  });
});

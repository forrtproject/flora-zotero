/** Full journal article BibTeX entry */
export const fullArticleBibtex = `@article{smith2022replication,
  title={A Replication of the Original Study},
  author={Smith, John and Doe, Jane},
  journal={Journal of Replications},
  year={2022},
  volume={10},
  number={3},
  pages={100-115},
  doi={10.5678/replication},
  issn={1234-5678},
  publisher={Academic Press}
}`;

/** Minimal BibTeX with only required fields */
export const minimalBibtex = `@misc{anon2023,
  title={Minimal Entry},
  year={2023}
}`;

/** Conference paper BibTeX */
export const conferencePaperBibtex = `@inproceedings{jones2021,
  title={Conference Paper Title},
  author={Jones, Alice},
  booktitle={Proceedings of the Conference on Testing},
  year={2021},
  pages={50-60}
}`;

/** Thesis BibTeX */
export const thesisBibtex = `@phdthesis{grad2020,
  title={Doctoral Thesis on Replications},
  author={Graduate, Student},
  institution={University of Testing},
  year={2020}
}`;

/** Malformed BibTeX */
export const malformedBibtex = `This is not valid BibTeX at all`;

/** Empty string */
export const emptyBibtex = ``;

/** BibTeX with nested braces */
export const nestedBracesBibtex = `@article{nested2022,
  title={A {Study} with {Nested} Braces},
  author={Author, Test},
  journal={Journal Name},
  year={2022}
}`;

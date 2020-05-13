package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"database/sql"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	// "github.com/jackc/pgx/stdlib"
	// "github.com/jmoiron/sqlx"
	// "github.com/jmoiron/sqlx/types"
	// "github.com/pkg/errors"
)

type todoJSON struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Notes        string `json:"notes"`
	DueDate      string `json:"dueDate"`
	Priority     int    `json:"priority"`
	Archived     bool   `json:"archived"`
	ArchiveDate  string `json:"archivedDate"`
	Completed    bool   `json:"completed"`
	CompleteDate string `json:"completedDate"`
	ModifiedDate string `json:"modifiedDate"`
	CreateDate   string `json:"createDate"`
}

type todoDB struct {
	ID           int            `db:"id"`
	Title        string         `db:"title"`
	Notes        sql.NullString `db:"notes"`
	DueDate      sql.NullTime   `db:"dueDate"`
	Priority     int            `db:"priority"`
	Archived     bool           `db:"archived"`
	ArchiveDate  sql.NullTime   `db:"archivedDate"`
	Completed    bool           `db:"completed"`
	CompleteDate sql.NullTime   `db:"completedDate"`
	ModifiedDate sql.NullTime   `db:"modifiedDate"`
	CreateDate   string         `db:"createDate"`
}

type allTodos []todoJSON

var todos = allTodos{
	{
		ID:           1,
		Title:        "Create Angular Project",
		Notes:        "upgrade angular cli",
		DueDate:      "5/12/2020",
		Priority:     2,
		Archived:     false,
		ArchiveDate:  "",
		Completed:    false,
		CompleteDate: "",
		ModifiedDate: "",
		CreateDate:   "5/11/2020",
	},
}

const (
	hostname     = "localhost"
	hostPort     = 5432
	username     = "API_VORTO"
	password     = ""
	databaseName = "vorto_challenge"
)

var (
	db *sql.DB
)

func returnNil(v string) *string {
	if v != "" {
		return &v
	}

	return nil
}

func returnString(v *sql.NullString) *string {
	var baseLine = ""
	fmt.Println(v)

	if v.Valid {
		return &v.String
	}

	return &baseLine
}

func returnTime(v sql.NullTime) *string {
	var baseLine = ""

	if v.Valid {
		baseLine = v.Time.String()
	}

	return &baseLine
}

func fetchTodos() ([]todoDB, error) {
	var todos []todoDB = make([]todoDB, 0)
	result, err := db.Query(`SELECT id, title, notes, "dueDate", priority, archived, "archivedDate", completed, "completedDate", "modifiedDate", "createDate" from todos`)

	if err != nil {
		fmt.Println(err.Error())
	}

	defer result.Close()

	for result.Next() {
		var todo todoDB
		err := result.Scan(&todo.ID, &todo.Title, &todo.Notes, &todo.DueDate, &todo.Priority, &todo.Archived, &todo.ArchiveDate, &todo.Completed, &todo.CompleteDate, &todo.ModifiedDate, &todo.CreateDate)
		if err != nil {
			fmt.Println(err.Error())
		}
		todos = append(todos, todo)
	}

	return todos, nil
}

func createTodo(w http.ResponseWriter, r *http.Request) {
	sqlStatement := `
		INSERT INTO todos(title, notes, "dueDate", priority, archived, "archivedDate", completed, "completedDate")
		VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)

	json.Unmarshal(body, &keyVal)

	title := keyVal["title"]
	notes := keyVal["notes"]
	dueDate := returnNil(keyVal["dueDate"])
	priority, _ := strconv.Atoi(keyVal["priority"])
	archived, _ := strconv.ParseBool(keyVal["archived"])
	archivedDate := returnNil(keyVal["archivedDate"])
	completed, _ := strconv.ParseBool(keyVal["completed"])
	completedDate := returnNil(keyVal["completedDate"])

	id := 0
	err = db.QueryRow(sqlStatement, title, notes, dueDate, priority, archived, archivedDate, completed, completedDate).Scan(&id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func getTodo(w http.ResponseWriter, r *http.Request) {
	todoID, err := strconv.Atoi(mux.Vars(r)["id"])
	sqlCommand := `SELECT id, title, notes, "dueDate", priority, archived, "archivedDate", 
	completed, "completedDate", "modifiedDate", "createDate" from todos WHERE id=$1`

	var todo todoDB
	row := db.QueryRow(sqlCommand, todoID)

	switch err = row.Scan(&todo.ID, &todo.Title, returnString(&todo.Notes), &todo.DueDate, &todo.Priority, &todo.Archived, &todo.ArchiveDate, &todo.Completed, &todo.CompleteDate, &todo.ModifiedDate, &todo.CreateDate); err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		w.WriteHeader(http.StatusNotFound)
	case nil:
		json.NewEncoder(w).Encode(todo)
	default:
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err.Error())
	}
}

func getTodos(w http.ResponseWriter, r *http.Request) {
	todos, err := fetchTodos()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(todos)
}

func updateTodo(w http.ResponseWriter, r *http.Request) {
	todoID, err := strconv.Atoi(mux.Vars(r)["id"])
	sqlStatement := `
		UPDATE todos
		SET title = $2,
		notes = $3,
		"dueDate" = $4,
		priority = $5,
		archived = $6,
		"archivedDate" = $7,
		completed = $8,
		"completedDate" = $9,
		"modifiedDate" = NOW()
		WHERE id = $1`

	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		panic(err.Error())
	}

	keyVal := make(map[string]string)

	json.Unmarshal(body, &keyVal)

	title := keyVal["title"]
	notes := keyVal["notes"]
	dueDate := returnNil(keyVal["dueDate"])
	priority, _ := strconv.Atoi(keyVal["priority"])
	archived, _ := strconv.ParseBool(keyVal["archived"])
	archivedDate := returnNil(keyVal["archivedDate"])
	completed, _ := strconv.ParseBool(keyVal["completed"])
	completedDate := returnNil(keyVal["completedDate"])

	id := 0
	err = db.QueryRow(sqlStatement, todoID, title, notes, dueDate, priority, archived, archivedDate, completed, completedDate).Scan(&id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println(err.Error())
	} else {
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(id)
	}
}

func deleteTodo(w http.ResponseWriter, r *http.Request) {
	todoID, err := strconv.Atoi(mux.Vars(r)["id"])

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w)
	}

	for i, singleTodo := range todos {
		if singleTodo.ID == todoID {
			todos = append(todos[:i], todos[i+1:]...)
			fmt.Fprintf(w, "The todo with ID %v has been deleted successfully", todoID)
		}
	}
}

func main() {

	var err error
	pgConString := fmt.Sprintf("port=%d host=%s user=%s dbname=%s sslmode=disable", hostPort, hostname, username, databaseName)

	db, err = sql.Open("postgres", pgConString)

	if err != nil {
		panic(err)
	}

	defer db.Close()

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/todos", createTodo).Methods("POST")
	router.HandleFunc("/todos", getTodos).Methods("GET")
	router.HandleFunc("/todos/{id}", getTodo).Methods("GET")
	router.HandleFunc("/todos/{id}", updateTodo).Methods("PUT")
	router.HandleFunc("/todos/{id}", deleteTodo).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":3000", router))
}
